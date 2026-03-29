# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build
./mvnw clean package

# Run
./mvnw spring-boot:run

# Test (all)
./mvnw test

# Test (single class)
./mvnw test -Dtest=JobtrackerApplicationTests
```

## Architecture

Spring Boot 3.2.5 REST API backend for tracking job applications. Java 17, MySQL 8, Maven.

**Package:** `com.tanzil.jobtracker`

**Layered architecture:**
```
Controller → Service → Repository → MySQL
```

**Request/Response flow:**
- All responses are wrapped in `ApiResponse<T>` (success flag, message, data)
- Errors are handled centrally via `GlobalExceptionHandler` (@RestControllerAdvice) returning `ErrorResponse`
- `JobNotFoundException` triggers 404; Bean Validation failures trigger 400 with field-level errors

**Key design patterns:**
- `JobDTO` carries validated input; `Job` is the JPA entity — the service converts between them
- `Status` enum (APPLIED, INTERVIEW, OFFER, REJECTED) is validated via a custom `@ValidStatus` constraint
- Pagination is available at `GET /jobs/paged` using Spring Data `Pageable`

**Security:** Spring Security is configured to permit all requests (CSRF disabled) — intentionally open for development.

## Database

MySQL running locally at `localhost:3306/jobtracker`. Credentials in `application.properties` (root/root123). Hibernate DDL is set to `update` so schema changes apply automatically on startup.
