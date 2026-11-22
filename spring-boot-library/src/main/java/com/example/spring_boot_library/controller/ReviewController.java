package com.example.spring_boot_library.controller;

import com.example.spring_boot_library.entity.Review;
import com.example.spring_boot_library.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService){
        this.reviewService= reviewService;
    }
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/book/{bookId}")
    public Page<Review> getReviewByBookId(@PathVariable Long bookId,
                                          @RequestParam (defaultValue = "0") int pageNo,
                                          @RequestParam(defaultValue = "10") int pageSize){
        return reviewService.getReviewsByBookId(bookId, pageNo, pageSize);
    }
}