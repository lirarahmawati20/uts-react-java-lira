package utslira.demo.controller;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utslira.demo.model.Job;
import utslira.demo.repository.JobRepository;

@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api/jobs")
@RestController
public class JobController {

    @Autowired
    JobRepository repository;

   

    
     @RequestMapping()
     public List <Job> getAll(){
        // System.out.println("hello word");
        return repository.findAll();
     }


     @RequestMapping("{id}")
     public Object getById(@PathVariable Long id){
        Job job=repository.findById(id).orElse(null);

          if (job !=null) {
            return job;
        }else{
            return"job dengan id  " +id + " tidak di temuakan";
        }
     }



    //  tambah 

    @PostMapping()
    public String create(@RequestBody Job job){
        repository.save(job);
        return"mahasiswa berhasil di tambahkan ";
    }

    

    // edit
    @PutMapping()
    public String UpdateByIndex(@RequestBody Job job){
                repository.save(job);
        return"job berhasil di di update" ;

    }


    //  hapus
    @DeleteMapping("{id}")
    public String DeletById(@PathVariable Long id){
        repository.deleteById(id);
        return" job sudah di hapus";
    }


    

}


