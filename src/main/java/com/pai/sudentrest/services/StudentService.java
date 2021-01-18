package com.pai.sudentrest.services;

import com.pai.sudentrest.entities.Student;
import com.pai.sudentrest.entities.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.NoSuchElementException;


@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getStudentList() {
        return (List<Student>) studentRepository.findAll();
    }

    public Student getStudent(Long id) { return studentRepository.findById(id).get(); }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.delete(studentRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Not found")));
    }

    public void editStudent(Student student, Long id) {
        Student existingStudent = studentRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Not found"));

        existingStudent.setAverage(student.getAverage());
        existingStudent.setName(student.getName());
        existingStudent.setSurname(student.getSurname());

        studentRepository.save(existingStudent);
    }

}
