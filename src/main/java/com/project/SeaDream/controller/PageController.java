package com.project.SeaDream.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Serves the Thymeleaf HTML pages.
 * Note: this must be a plain @Controller (not @RestController) so the
 * returned String is resolved as a VIEW NAME and rendered by Thymeleaf,
 * instead of being sent back as literal text.
 */
@Controller
public class PageController {

    @GetMapping("/")
    public String home() {
        return "mainproject"; // resolves to templates/mainproject.html
    }

    @GetMapping("/shop")
    public String shop() {
        return "project2ndpage"; // resolves to templates/project2ndpage.html
    }
}
