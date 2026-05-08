package com.health.checkup.controller;

import com.health.checkup.model.HealthPackage;
import com.health.checkup.service.HealthPackageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "http://localhost:3000")
public class HealthPackageController {
    private final HealthPackageService service;
    public HealthPackageController(HealthPackageService s) { this.service = s; }

    @GetMapping
    public ResponseEntity<List<HealthPackage>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HealthPackage> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
               .orElse(ResponseEntity.notFound().build());
    }
}
