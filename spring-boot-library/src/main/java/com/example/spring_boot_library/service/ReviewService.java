package com.example.spring_boot_library.service;

import com.example.spring_boot_library.entity.Review;
import org.springframework.data.domain.Page;

public interface ReviewService {
    Page<Review> getReviewsByBookId(Long bookId, int pageNo, int pageSize);
}
