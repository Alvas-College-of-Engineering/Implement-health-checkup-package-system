package com.health.checkup.service;

import com.health.checkup.model.HealthPackage;
import com.health.checkup.model.Patient;
import com.health.checkup.repository.HealthPackageRepository;
import com.health.checkup.repository.PatientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    private final PatientRepository patientRepo;
    private final HealthPackageRepository packageRepo;

    public PatientService(PatientRepository p, HealthPackageRepository hp) {
        this.patientRepo = p; this.packageRepo = hp;
    }

    public List<Patient> getAll() { return patientRepo.findAll(); }

    public Optional<Patient> getById(Long id) { return patientRepo.findById(id); }

    public Patient book(Patient patient, Long packageId) {
        HealthPackage pkg = packageRepo.findById(packageId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found"));
        patient.setSelectedPackage(pkg);
        patient.setStatus(Patient.BookingStatus.CONFIRMED);
        return patientRepo.save(patient);
    }

    public Patient cancel(Long id) {
        Patient p = patientRepo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        p.setStatus(Patient.BookingStatus.CANCELLED);
        return patientRepo.save(p);
    }

    public void delete(Long id) { patientRepo.deleteById(id); }
}
