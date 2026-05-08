package com.health.checkup.controller;

import com.health.checkup.model.Patient;
import com.health.checkup.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    private final PatientService service;
    public PatientController(PatientService s) { this.service = s; }

    @GetMapping
    public ResponseEntity<List<Patient>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping("/book/{packageId}")
    public ResponseEntity<Patient> book(@Valid @RequestBody Patient patient,
                                        @PathVariable Long packageId) {
        return ResponseEntity.ok(service.book(patient, packageId));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Patient> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(service.cancel(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,String>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }
}
