package com.tanzil.jobtracker.controller;

import com.tanzil.jobtracker.dto.ApiResponse;
import com.tanzil.jobtracker.dto.JobDTO;
import com.tanzil.jobtracker.entity.Job;
import com.tanzil.jobtracker.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping("/paged")
    public ResponseEntity<ApiResponse<Page<JobDTO>>> getJobPaged(Pageable pageable){

        Page<JobDTO> jobs = jobService.getJobs(pageable).map(jobService::convertToDTO);

        return ResponseEntity.ok(new ApiResponse<>(true,"JOB fetched with pagination",jobs));
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobDTO>> getJobById(@PathVariable Long id) {

        Job job = jobService.getJobById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Job fetched successfully",
                        jobService.convertToDTO(job)
                )
        );
    }

    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<List<JobDTO>>> getAllJobs() {

        List<JobDTO> jobs = jobService.getAllJobs()
                .stream()
                .map(jobService::convertToDTO)
                .toList();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Jobs fetched successfully",
                        jobs
                )
        );
    }

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<ApiResponse<JobDTO>> createJob(@Valid @RequestBody JobDTO jobDTO) {

        Job job = jobService.convertToEntity(jobDTO);
        Job saved = jobService.saveJob(job);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Job created successfully",
                        jobService.convertToDTO(saved)
                )
        );
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobDTO>> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobDTO jobDTO
    ) {

        Job job = jobService.convertToEntity(jobDTO);
        Job updated = jobService.updateJob(id, job);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Job updated successfully",
                        jobService.convertToDTO(updated)
                )
        );
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteJob(@PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Job deleted successfully",
                        null
                )
        );
    }
}