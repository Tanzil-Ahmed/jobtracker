package com.tanzil.jobtracker.repository;

import com.tanzil.jobtracker.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// this interface connects your app to the database
@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
}