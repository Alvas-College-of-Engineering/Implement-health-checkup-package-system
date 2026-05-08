package com.health.checkup.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @Min(1) @Max(120)
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotBlank @Email(message = "Invalid email")
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone")
    private String phone;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "package_id")
    private HealthPackage selectedPackage;

    @Column(name = "booked_at", updatable = false)
    private LocalDateTime bookedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private BookingStatus status = BookingStatus.CONFIRMED;

    @PrePersist
    protected void onCreate() { this.bookedAt = LocalDateTime.now(); }

    public enum BookingStatus { CONFIRMED, CANCELLED }
}
