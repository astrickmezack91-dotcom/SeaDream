package com.project.SeaDream.controller;

import com.project.SeaDream.entity.CartItem;
import com.project.SeaDream.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;


    // GET ALL CART ITEMS
    @GetMapping
    public List<CartItem> getCart() {

        return cartItemRepository.findAll();

    }


    // ADD PRODUCT TO CART
    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartItem cartItem) {

        return cartItemRepository.save(cartItem);

    }


    // REMOVE ONE PRODUCT
    @DeleteMapping("/remove/{id}")
    public String removeFromCart(@PathVariable Long id) {

        cartItemRepository.deleteById(id);

        return "Product removed from cart: " + id;

    }


    // CLEAR ENTIRE CART
    @DeleteMapping("/clear")
    public String clearCart() {

        cartItemRepository.deleteAll();

        return "Cart cleared successfully";

    }

}