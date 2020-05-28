package com.humbo.humbo2;

import java.util.Optional;

import com.humbo.humbo2.domain.Category;
import com.humbo.humbo2.domain.Customer;
import com.humbo.humbo2.domain.Seller;
import com.humbo.humbo2.repository.CategoryRepository;
import com.humbo.humbo2.repository.CustomerRepository;
import com.humbo.humbo2.repository.SellerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final SellerRepository sellerRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public DatabaseLoader(CategoryRepository categoryRepository, SellerRepository sellerRepository, CustomerRepository customerRepository) {
        this.categoryRepository = categoryRepository;
        this.sellerRepository = sellerRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        String[] categoryNames = { "Electronic", "Mobile Phones", "TV", "Smart Phones", "Home", "Furniture" };

        Category[] categories = new Category[categoryNames.length];
        Category root = this.categoryRepository.findByName("root");
        if(root == null){
            root = new Category("root");
            this.categoryRepository.save(root);
        }

        for (int i = 0; i < categoryNames.length; i++) {
            categories[i] = this.categoryRepository.findByName(categoryNames[i]);
            if (categories[i] == null)
                categories[i] = new Category(categoryNames[i], root);
        }
        categories[1].setParent(categories[0]);
        categories[2].setParent(categories[0]);
        categories[3].setParent(categories[1]);
        categories[5].setParent(categories[4]);

        for (Category c : categories) {
            this.categoryRepository.save(c);
        }

        Optional<Seller> seller = this.sellerRepository.findByEmail("umut@gmail.com");
        if (!seller.isPresent()) {
            seller = Optional
                    .of(new Seller("umut@gmail.com", "umutumut", "umutumut", "umpi", "6546516351", "", "", "SELLER"));
            this.sellerRepository.save(seller.get());
        }
        Optional<Seller> seller2 = this.sellerRepository.findByEmail("hasan.akalp@gmail.com");
        if (!seller2.isPresent()) {
            seller2 = Optional
                    .of(new Seller("hasan.akalp@gmail.com", "hasan", "hasan", "hasan", "684656415", "", "", "SELLER"));
            this.sellerRepository.save(seller2.get());
        }

        Optional<Seller> seller3 = this.sellerRepository.findByEmail("test@test.com");
        if (!seller3.isPresent()) {
            seller3 = Optional.of(new Seller("test@test.com", "test", "Test", "TestCo", "684656415", "+905425896521",
                    "01/01/1970", "SELLER"));
            this.sellerRepository.save(seller3.get());
        }

        Optional<Seller> seller4 = this.sellerRepository.findByEmail("test4@test.com");
        if (!seller4.isPresent()) {
            seller4 = Optional.of(new Seller("test4@test.com", "testtest", "Test", "TestCo", "684656415", "+905425896521",
                    "01/01/1970", "SELLER"));
            this.sellerRepository.save(seller4.get());
        }

        Optional<Customer> customer = this.customerRepository.findByEmail("testcustomer1@gmail.com");
        if (!customer.isPresent()) {
            customer = Optional
                    .of(new Customer("testcustomer1@gmail.com", "testc1", "testc2", "+90555", "01/01/01", "CUSTOMER"));
            this.customerRepository.save(customer.get());
        }
        Optional<Customer> customer2 = this.customerRepository.findByEmail("testcustomer2@gmail.com");
        if (!customer2.isPresent()) {
            customer2 = Optional
                    .of(new Customer("testcustomer2@gmail.com", "testc2", "testc2", "+90444", "01/01/01", "CUSTOMER"));
            this.customerRepository.save(customer2.get());
        }
    }
}