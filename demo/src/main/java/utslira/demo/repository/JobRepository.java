package utslira.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import utslira.demo.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

     
    
}
