package com.pai.sudentrest.controllers;

import com.pai.sudentrest.entities.Student;
import com.pai.sudentrest.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Scanner;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/students")
    public List<Student> getAll() {
        return this.studentService.getStudentList();
    }

    @GetMapping("/students/{studentId}")
    public Student getStudent(@PathVariable long studentId) {
        return studentService.getStudent(studentId);
    }

    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @DeleteMapping("/students/{id}")
    public void addStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Provide correct user Id");
        }
    }

    @PutMapping("/students/{id}")
    public void editStudent(@RequestBody Student student,@PathVariable Long id) {
        try {
            studentService.editStudent(student,id);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Provide correct user Id");
        }
    }

    @RequestMapping(value = "/")
    @ResponseBody
    public String getRootContent() throws IOException {
        return getResource("/Users/aoleszczuk/Desktop/PAI/Security-RestApi/SpringRestAPI/src/main/resources/static/index.html");
    }

    @GetMapping("/add")
    public String add() throws IOException {
        return getResource("/Users/aoleszczuk/Desktop/PAI/Security-RestApi/SpringRestAPI/src/main/resources/static/add.html");
    }

    @GetMapping("/edit")
    public String edit() throws IOException {
        return getResource("/Users/aoleszczuk/Desktop/PAI/Security-RestApi/SpringRestAPI/src/main/resources/static/edit.html");
    }


    private String getResource(String filePath) throws FileNotFoundException {
        Scanner fileReader = new Scanner(new File(filePath));
        StringBuilder content = new StringBuilder();
        while (fileReader.hasNextLine()){
            content.append(fileReader.nextLine());
        }
        return content.toString();
    }

}
