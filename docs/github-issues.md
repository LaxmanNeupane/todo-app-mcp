# GitHub Issues for To-Do API PRD

These issues translate the PRD in [docs/prd.md](C:\Users\neupa\todo-app\docs\prd.md) into a practical implementation backlog for the current codebase.

## Issue 1: Establish API foundation and to-do domain model

**Title**
`Establish API foundation and to-do domain model`

**Body**

## Summary
Set up the API structure so the app has a clear place for request handling, validation, and in-memory persistence. The current server stores raw request bodies directly, which is too loose for the PRD contract.

## Why
The PRD requires a predictable JSON contract and a base architecture that can later support more CRUD operations and authentication. We need a small but intentional foundation before layering behavior on top.

## Scope
- Keep in-memory storage for v1
- Introduce a consistent to-do object shape
- Separate app setup from server startup if needed for testing
- Prepare code organization for future extension

## Acceptance Criteria
- The application has a defined to-do shape with these fields:
  - `id`
  - `title`
  - `description`
  - `completed`
  - `createdAt`
- New to-do records are created through application logic, not by pushing raw request bodies directly into storage
- In-memory storage remains the persistence strategy for this release
- The code structure supports adding automated API tests without starting a real server process per test

## Notes
- Authentication, update, delete, filtering, and pagination remain out of scope

## Issue 2: Implement `POST /todos` with validation and default values

**Title**
`Implement POST /todos with validation and default values`

**Body**

## Summary
Implement to-do creation according to the PRD, including field validation, generated IDs, default values, and the correct success response.

## Why
Creating a to-do item is the primary write path in v1 and currently does not enforce any contract.

## Requirements
- Endpoint: `POST /todos`
- Accept JSON request body with:
  - `title` required, string, 1-200 characters
  - `description` optional, string, up to 1000 characters
- Apply defaults:
  - `description` defaults to `""`
  - `completed` defaults to `false`
- Generate a unique string ID
- Set `createdAt` as an ISO 8601 timestamp

## Acceptance Criteria
- Valid requests return `201 Created`
- Successful response body includes:
  - `id`
  - `title`
  - `description`
  - `completed`
  - `createdAt`
- Missing `title` returns `400 Bad Request`
- Empty `title` returns `400 Bad Request`
- Title longer than 200 characters returns `400 Bad Request`
- Description longer than 1000 characters returns `400 Bad Request`
- Omitted `description` is stored and returned as an empty string
- `completed` is not accepted from the client as a required input for v1; server controls the stored default value

## Issue 3: Implement `GET /todos` and `GET /todos/:id`

**Title**
`Implement read endpoints for listing todos and fetching by id`

**Body**

## Summary
Complete the read side of the API so clients can fetch all to-dos or a single to-do by ID.

## Why
The PRD defines two read experiences: list view and detail view. Only the list route exists today, and it does not yet guarantee the final API contract.

## Requirements
- `GET /todos`
- `GET /todos/:id`

## Acceptance Criteria
- `GET /todos` returns `200 OK`
- `GET /todos` returns a JSON array
- `GET /todos` returns `[]` when no to-dos exist
- `GET /todos/:id` returns `200 OK` and the matching to-do when the ID exists
- `GET /todos/:id` returns `404 Not Found` when the ID does not exist
- Not found response body matches:

```json
{
  "error": "Todo not found"
}
```

## Issue 4: Add consistent JSON error handling

**Title**
`Add consistent JSON error handling for validation and malformed input`

**Body**

## Summary
Introduce consistent error responses across the API for validation failures and malformed JSON payloads.

## Why
The PRD explicitly calls for clear, consistent error responses and graceful handling of malformed input.

## Requirements
- Return JSON error responses for handled client errors
- Support the suggested validation error shape from the PRD
- Handle invalid JSON payloads without crashing the server

## Acceptance Criteria
- Validation failures return `400 Bad Request`
- Validation failures use a consistent response shape, for example:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

- Malformed JSON request bodies return `400 Bad Request`
- Malformed JSON errors respond with JSON, not HTML
- All implemented endpoints respond with JSON on both success and expected client-error paths

## Issue 5: Add API test coverage and a working test script

**Title**
`Add API tests for todo creation, reads, and error cases`

**Body**

## Summary
Replace the placeholder test setup with real automated coverage for the API contract.

## Why
The PRD emphasizes reliability and a predictable contract. Right now the repository has only a trivial test and `npm test` intentionally fails.

## Scope
- Add integration-style tests for the Express app
- Update `package.json` so `npm test` runs the suite
- Cover success and failure paths for implemented endpoints

## Acceptance Criteria
- `npm test` runs successfully
- Tests cover:
  - successful `POST /todos`
  - default `description`
  - generated `id`
  - default `completed: false`
  - generated `createdAt`
  - validation failure for missing title
  - validation failure for empty title
  - validation failure for overly long fields
  - successful `GET /todos`
  - empty-array response from `GET /todos`
  - successful `GET /todos/:id`
  - `404` response for unknown ID
  - malformed JSON request handling

## Issue 6: Document local development and API contract

**Title**
`Document local setup and v1 API contract`

**Body**

## Summary
Add developer-facing documentation that explains how to run the API locally and what the v1 contract looks like.

## Why
One of the success metrics is that frontend developers can integrate without extra clarification. The codebase should make that easy.

## Acceptance Criteria
- Documentation explains how to install dependencies and start the server locally
- Documentation explains how to run tests
- Documentation includes the v1 endpoints:
  - `POST /todos`
  - `GET /todos`
  - `GET /todos/:id`
- Documentation includes example success and error responses
- Documentation clearly states current non-goals:
  - no auth
  - no update/delete
  - no filtering/pagination/search
- Documentation notes that persistence is in-memory for v1

## Suggested Milestone Order

1. Establish API foundation and to-do domain model
2. Implement `POST /todos` with validation and default values
3. Implement `GET /todos` and `GET /todos/:id`
4. Add consistent JSON error handling
5. Add API test coverage and a working test script
6. Document local development and API contract
