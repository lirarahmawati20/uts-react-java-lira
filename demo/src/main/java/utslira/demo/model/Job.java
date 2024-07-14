package utslira.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Job {
    
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String location;
    private Integer salary;
    private String description;



    public Job(){

    }



    public Job(Long id, String title, String company, String location, Integer salary, String description) {
      this.id = id;
      this.title = title;
      this.company = company;
      this.location = location;
      this.salary = salary;
      this.description = description;
    }



    public Long getId() {
      return id;
    }



    public String getTitle() {
      return title;
    }



    public String getCompany() {
      return company;
    }



    public String getLocation() {
      return location;
    }



    public Integer getSalary() {
      return salary;
    }



    public String getDescription() {
      return description;
    }
    

}
