package com.humbo.humbo2.controller;

import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import com.humbo.humbo2.domain.Basket;
import com.humbo.humbo2.domain.Customer;
import com.humbo.humbo2.domain.Product;
import com.humbo.humbo2.domain.ProductOrder;
import com.humbo.humbo2.repository.AddressRepository;
import com.humbo.humbo2.repository.BasketRepository;
import com.humbo.humbo2.repository.CustomerRepository;
import com.humbo.humbo2.repository.ProductOrderRepository;
import com.humbo.humbo2.repository.ProductRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    private CustomerRepository customerRepository;
    private ProductRepository productRepository;
    private BasketRepository basketRepository;
    private ProductOrderRepository orderRepository;
    private AddressRepository addressRepository;

    public BasketController(CustomerRepository customerRepository, ProductRepository productRepository,
            BasketRepository basketRepository, ProductOrderRepository orderRepository,
            AddressRepository addressRepository) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.basketRepository = basketRepository;
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getBasket() {
        Customer user = this.customerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername())
                .get();
        Optional<Basket> basket = this.basketRepository.findByCustomerAndActive(user, true);
        if (!basket.isPresent()) {
            Basket temp = new Basket(user);
            this.basketRepository.save(temp);
            return ResponseEntity.ok().body(temp);
        }
        return ResponseEntity.ok().body(basket.get());
    }

    @PostMapping("")
    public ResponseEntity<?> addProduct(@RequestParam Long productId, @RequestParam Integer quantity) {
        Customer user = this.customerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername())
                .get();
        Product product = this.productRepository.findById(productId).get();

        ProductOrder order = new ProductOrder(user, product, product.getSeller(), quantity, null);

        Optional<Basket> basket = this.basketRepository.findByCustomerAndActive(user, true);
        if (basket.isPresent()) {
            order.setBasket(basket.get());
        } else {
            Basket temp = new Basket(user);
            this.basketRepository.save(temp);
            order.setBasket(temp);
        }
        orderRepository.save(order);
        return ResponseEntity.ok().body(null);
    }

    @PutMapping("")
    public ResponseEntity<?> updateProductOrder(@RequestParam Long orderId, @RequestParam Integer quantity) {
        // Customer user = this.customerRepository.findByEmail(((UserDetails)
        // SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()).get();
        ProductOrder order = this.orderRepository.findById(orderId).get();
        order.setQuantity(quantity);
        this.orderRepository.save(order);
        return ResponseEntity.ok().body(String.format("Quantity of %d is updated to %d", order.getId(), quantity));
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteProductOrder(@RequestParam Long orderId) {
        this.orderRepository.deleteById(orderId);
        ;
        return ResponseEntity.ok().body(String.format("%d is deleted", orderId));
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@Valid @RequestBody(required = false) PaymentWrapper payment) {
        Customer user = this.customerRepository.findByEmail(
                ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername())
                .get();
        Basket basket = this.basketRepository.findByCustomerAndActive(user, true).get();
        Set<ProductOrder> orders = basket.getOrders();
        if (orders.size() == 0)
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        for (ProductOrder order : orders) {
            // Payment API (Customer to HUMBO)
            order.setIsPaid(true);
            // order.setAddress(this.addressRepository.findById(payment.getAddressId()).get());
            this.orderRepository.save(order);
        }
        basket.setActive(false);
        this.basketRepository.save(basket);
        return ResponseEntity.ok().body("Operation is successful!");
    }
}