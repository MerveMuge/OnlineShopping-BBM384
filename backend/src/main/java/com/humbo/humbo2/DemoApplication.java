package com.humbo.humbo2;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.humbo.humbo2.storage.StorageProperties;
import com.humbo.humbo2.storage.StorageService;

@SpringBootApplication
@EnableJpaRepositories(basePackages = { "com.humbo.humbo2.repository" })
@EnableConfigurationProperties(StorageProperties.class)
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> {
            // storageService.deleteAll();
            storageService.init();
        };
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**/**/**/*").allowedOrigins("http://localhost:8888").allowedMethods("*");
                registry.addMapping("/**/**/*").allowedOrigins("http://localhost:8888").allowedMethods("*");
                registry.addMapping("/**/*").allowedOrigins("http://localhost:8888").allowedMethods("*");
                registry.addMapping("/**").allowedOrigins("http://localhost:8888").allowedMethods("*");
                registry.addMapping("/").allowedOrigins("http://localhost:8888").allowedMethods("*");
            }
        };
    }
}
