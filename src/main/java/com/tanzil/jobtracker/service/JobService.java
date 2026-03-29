package com.tanzil.jobtracker.service;

import com.tanzil.jobtracker.dto.JobDTO;
import com.tanzil.jobtracker.entity.Job;
import com.tanzil.jobtracker.enums.Status;
import com.tanzil.jobtracker.exception.JobNotFoundException;
import com.tanzil.jobtracker.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

// Business logic layer
@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    // ✅ GET BY ID
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id :" + id));
    }

    // ✅ GET ALL
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // ✅ SAVE
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    // ✅ UPDATE
    public Job updateJob(Long id, Job updateJob) {

        Optional<Job> existing = jobRepository.findById(id);

        if (existing.isPresent()) {
            Job job = existing.get();

            job.setCompany(updateJob.getCompany());
            job.setRole(updateJob.getRole());
            job.setStatus(updateJob.getStatus());

            return jobRepository.save(job);
        }

        throw new JobNotFoundException("Job not found with id :" + id);
    }

    // ✅ DELETE
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    // ✅ DTO → ENTITY
    public Job convertToEntity(JobDTO dto) {
        Job job = new Job();

        job.setCompany(dto.getCompany());
        job.setRole(dto.getRole());

        job.setStatus(dto.getStatus()); // ✅ DIRECT ENUM

        return job;
    }

    // ✅ ENTITY → DTO
    public JobDTO convertToDTO(Job job) {
        return new JobDTO(
                job.getId(),
                job.getCompany(),
                job.getRole(),
                job.getStatus()
        );
    }

    // ✅ PAGINATION
    public Page<Job> getJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }
}