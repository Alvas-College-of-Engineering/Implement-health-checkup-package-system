package com.health.checkup.service;

import com.health.checkup.model.HealthPackage;
import com.health.checkup.repository.HealthPackageRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HealthPackageService {
    private final HealthPackageRepository repo;
    public HealthPackageService(HealthPackageRepository repo) { this.repo = repo; }
    public List<HealthPackage> getAll()              { return repo.findAll(); }
    public Optional<HealthPackage> getById(Long id)  { return repo.findById(id); }
}
