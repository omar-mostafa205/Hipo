# Docy: Automated Code Documentation

Docy is a full-stack Next.js application designed to automatically generate comprehensive technical and API documentation from a codebase. It streamlines the documentation process by analyzing a project's Abstract Syntax Tree (AST) to understand its structure, components, and relationships. Users can provide a Git repository URL or upload a zip file, and Docy utilizes AI to produce detailed, well-structured documentation in Markdown format.

The application is built using the T3 Stack, featuring Next.js for both frontend and backend, tRPC for typesafe API communication, Prisma as the ORM for database interactions, and NextAuth.js for handling user authentication via providers like GitHub, Google, and GitLab.


## Quick Start


Follow these steps to get the project running locally.


### Prerequisites


* Node.js (v18 or later recommended)
* pnpm (or npm/yarn)
* A PostgreSQL database (or other Prisma-compatible database)


### Installation


1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd docy-project
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and populate it with the required variables. See the [Environment Variables](#environment-variables) section for details.

4.  **Push the database schema:**
    ```bash
    pnpm db:push
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:3000`.


## Architecture



### System Architecture Diagram


The application follows a modern full-stack architecture centered around Next.js and tRPC. The diagram below illustrates the primary components and data flow.

```mermaid
graph TD
    subgraph Browser
        A[React Components] -->|tRPC Hooks| B[tRPC Client]
    end

    subgraph "Server (Next.js)"
        B -->|HTTP Requests| C[tRPC API Route]
        C -->|Procedure Calls| D[tRPC Routers]
        D -->|Database Queries| E{Prisma ORM}
        D -->|Auth Checks| F[NextAuth.js Middleware]
        D -->|File & AI Processing| G[Core Library]
    end

    subgraph "Core Library (src/lib)"
        G -- calls --> H[downloadRepo.ts]
        G -- calls --> I[zipExtract.ts / ast.ts]
        G -- calls --> J[ai.ts]
    end

    subgraph External_Services[External Services]
        E -->|SQL| K[Database]
        J -->|API Call| L[Google Gemini AI]
        F -->|OAuth| M[Auth Providers]
    end

    style Browser fill:#e6f7ff,stroke:#91d5ff
    style "Server (Next.js)" fill:#f6ffed,stroke:#b7eb8f
    style External_Services fill:#fffbe6,stroke:#ffe58f
```


### Project Structure


The project is organized following conventions common in T3 Stack applications, separating concerns by feature and domain.

```
/
├── prisma/
│   └── schema.prisma         # Database schema definition
├── public/
│   └── ...                   # Static assets
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication-related pages (sign-in)
│   │   ├── (main)/             # Main application pages (dashboard, upload)
│   │   ├── api/
│   │   │   ├── auth/           # NextAuth.js catch-all route
│   │   │   └── trpc/           # tRPC catch-all route
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── ui/                 # Reusable UI components (shadcn/ui)
│   │   ├── DashboardBody.tsx   # Displays user's repositories
│   │   ├── RenderDocs.tsx      # Renders the list of generated documents
│   │   ├── RenderDocument.tsx  # Markdown renderer with Mermaid support
│   │   └── RepoForm.tsx        # Form to submit a repository for analysis
│   ├── lib/
│   │   ├── ai.ts               # Gemini AI integration for doc generation
│   │   ├── ast.ts              # Abstract Syntax Tree parsing logic
│   │   ├── downloadRepo.ts     # Logic for downloading git repositories
│   │   └── zipExtract.ts       # Logic for extracting zip files
│   ├── server/
│   │   ├── api/
│   │   │   ├── root.ts         # Root tRPC router
│   │   │   └── routers/        # tRPC procedure definitions (project.ts)
│   │   ├── auth/
│   │   │   ├── config.ts       # NextAuth.js configuration
│   │   │   └── index.ts        # NextAuth.js handlers
│   │   └── db.ts               # Prisma client initialization
│   ├── trpc/
│   │   ├── react.tsx           # tRPC client provider
│   │   └── server.ts           # tRPC server-side helpers
│   ├── env.js                  # Environment variable validation (T3 Env)
│   └── middleware.ts           # Next.js middleware for route protection
├── next.config.js              # Next.js configuration
└── package.json                # Project metadata and dependencies
```


## API Reference (tRPC)


The application uses tRPC for its API layer, providing end-to-end typesafety. The procedures are defined in `src/server/api/routers/`. The main router is `projectRouter`.


### `project.createRepo` (Mutation)


Downloads a repository, analyzes its code to generate an AST, calls an AI service to generate documentation, and saves the results to the database.

**Authentication:** Required

**Input Schema:**
```typescript
z.object({
  repoisteryUrl: z.string(), // The URL of the git repository
  repoToken: z.string(),     // Personal access token for private repos
  type: z.enum(['technical', 'api', 'both']) // Type of documentation to generate
})
```

**Response (Success):**
```json
{
  "success": true,
  "projectId": "clx123abc456def789"
}
```

**Possible Errors:**
* **401 UNAUTHORIZED:** User is not logged in.
* **400 BAD_REQUEST:** `repoisteryUrl` or `repoToken` is missing.
* **500 INTERNAL_SERVER_ERROR:** Failed to download the repository, process files, or generate documentation.


### `project.getRepos` (Query)


Retrieves a list of all repositories processed by the currently logged-in user.

**Authentication:** Required

**Input Schema:**
```typescript
z.object({
  userId: z.string()
})
```

**Response:** An array of `ProjectData` objects.
```json
[
  {
    "id": "clx123abc456def789",
    "userId": "user-abc-123",
    "name": null,
    "repoisteryUrl": "https://github.com/user/repo",
    "zipFileName": null,
    "githubUrl": null,
    "createdAt": "2023-10-27T10:00:00.000Z"
  }
]
```


### `project.getDocs` (Query)


Retrieves all generated documentation for a specific project ID.

**Authentication:** Required

**Input Schema:**
```typescript
z.object({
  id: z.string() // The ID of the project
})
```

**Response:** An array of `Documentation` objects, ordered by creation date descending.
```json
[
  {
    "id": "doc-xyz-789",
    "body": "...",
    "type": "TECHNICAL",
    "projectDataId": "clx123abc456def789",
    "createdAt": "2023-10-27T10:01:00.000Z",
    "updatedAt": "2023-10-27T10:01:00.000Z"
  }
]
```


## Core Functions & Components



### Function Documentation



#### `downloadRepo()`

**Location:** `src/lib/downloadRepo.ts`
**Purpose:** Downloads a Git repository from GitHub, GitLab, or Azure DevOps as a ZIP buffer. It detects the provider from the URL and constructs the appropriate API request with authentication headers.

**Signature:**
```typescript
async function downloadRepo(
  repoUrl: string,
  repoToken: string
): Promise<Buffer | null>
```

**Parameters:**
* `repoUrl` (string): The full URL of the repository to download.
* `repoToken` (string): A personal access token for authentication.

**Returns:** `Promise<Buffer | null>` - A `Buffer` containing the zipped repository data, or `null` if the download fails.

**Example Usage:**
```typescript
const repoUrl = "https://github.com/my-org/my-repo";
const token = "ghp_xxxxxxxx";
const zipBuffer = await downloadRepo(repoUrl, token);
```


#### `extractFile()`

**Location:** `src/lib/zipExtract.ts`
**Purpose:** Extracts a ZIP file buffer in-memory, iterates through its contents, filters out ignored and unsupported files, and parses the remaining source code files into an Abstract Syntax Tree (AST) structure.

**Signature:**
```typescript
async function extractFile(
  zipFile: Buffer
): Promise<ParsedFile[]>
```

**Parameters:**
* `zipFile` (Buffer): A buffer containing the ZIP archive of a repository.

**Returns:** `Promise<ParsedFile[]>` - An array of `ParsedFile` objects, each representing the AST of a file from the repository.

**Dependencies:**
* `adm-zip`: For handling ZIP files.
* `./ast`: For parsing file content into ASTs.


### Component Documentation



#### `RepoForm`

**Location:** `src/components/RepoForm.tsx`
**Purpose:** Provides a user interface for submitting a repository for documentation generation. It includes fields for the repository URL, a personal access token, and a selection for the type of documentation to generate (Technical, API, or both). It handles form validation and submission via the `project.createRepo` tRPC mutation.

**Props:** None

**Usage:**
```tsx
import { RepoForm } from '@/components/RepoForm';

<RepoForm />
```

**State:**
* Manages form state using `react-hook-form` and `zod` for validation.
* Tracks the submission/generation state to provide user feedback.


#### `RenderDocument`

**Location:** `src/components/RenderDocument.tsx`
**Purpose:** Renders Markdown content with advanced features, including syntax highlighting for code blocks and rendering of Mermaid.js diagrams. It dynamically loads syntax highlighters and handles potential errors in Mermaid syntax gracefully by displaying an informative error message.

**Props:**
```typescript
interface RenderDocumentProps {
  documentetaion: string; // The Markdown string to render
}
```

**Usage:**
```tsx
import { RenderDocument } from '@/components/RenderDocument';

const markdownContent = "# Title\
\
```javascript\
console.log('hello');\
```";

<RenderDocument documentetaion={markdownContent} />
```

**Dependencies:**
* `react-markdown`: For rendering Markdown.
* `react-syntax-highlighter`: For code syntax highlighting.
* `mermaid`: For rendering diagrams.


## Database


The application uses Prisma as its ORM. The schema is defined in `prisma/schema.prisma`. Below is an Entity Relationship Diagram and a summary of the core data models.


### ER Diagram


```mermaid
erDiagram
    USER ||--o{ PROJECT_DATA : has
    USER ||--o{ ACCOUNT : has
    USER ||--o{ SESSION : has
    USER ||--o{ POST : "created by"
    PROJECT_DATA ||--|{ DOCUMENTATION : contains

    USER {
        string id PK
        string name
        string email
        string image
        datetime emailVerified
    }

    PROJECT_DATA {
        string id PK
        string userId FK
        string repoisteryUrl
        string zipFileName
        datetime createdAt
    }

    DOCUMENTATION {
        string id PK
        string projectDataId FK
        string body
        string type "Enum: TECHNICAL, API"
        datetime createdAt
        datetime updatedAt
    }

    POST {
        string id PK
        string name
        string createdById FK
        datetime createdAt
    }
```


### Core Models


* **ProjectData**: Represents a repository that a user has submitted for documentation. It stores the repository URL and links to the user who submitted it.
* **Documentation**: Stores the generated documentation content. Each record is linked to a `ProjectData` entry and has a `type` to distinguish between `TECHNICAL` and `API` documentation.
* **User, Account, Session, VerificationToken**: Standard models required by NextAuth.js for managing user authentication and sessions.


## Configuration



### Environment Variables


The following environment variables are required. Create a `.env` file in the project root to configure them. | Variable | Description | Example |
| ----------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| `DATABASE_URL` | Connection string for the PostgreSQL database. | `postgresql://user:pass@host:port/db?schema=public`|
| `AUTH_SECRET` | A secret key for NextAuth.js to sign tokens. | `your-super-secret-key` |
| `GITHUB_ID` | Client ID for the GitHub OAuth provider. | `...` |
| `GITHUB_SECRET` | Client Secret for the GitHub OAuth provider. | `...` |
| `GOOGLE_ID` | Client ID for the Google OAuth provider. | `...` |
| `GOOGLE_SECRET` | Client Secret for the Google OAuth provider. | `...` |
| `GITLAB_ID` | Client ID for the GitLab OAuth provider. | `...` |
| `GITLAB_SECRET` | Client Secret for the GitLab OAuth provider. | `...` |
| `GEMINI_API_KEY` | API key for Google Gemini, used for AI-powered documentation generation. | `...` | ### `next.config.js`

This file configures Next.js. A key setting is `serverExternalPackages`, which lists `tree-sitter` and its language parsers. This is necessary because these packages contain native bindings that Next.js needs to handle correctly in a server environment.


## Advanced Features



### Authentication and Authorization


Authentication is handled by **NextAuth.js**, configured in `src/server/auth/config.ts`.
* **Providers**: Supports OAuth sign-in with GitHub, Google, and GitLab.
* **Adapter**: Uses `@auth/prisma-adapter` to persist user data, sessions, and accounts in the database.
* **Route Protection**: The `src/middleware.ts` file protects routes like `/dashboard` and `/upload-repo`, redirecting unauthenticated users to the sign-in page. The `protectedProcedure` in tRPC (`src/server/api/trpc.ts`) ensures that specific API endpoints can only be accessed by authenticated users.


### File Processing and AI Generation


A core feature of Docy is its ability to process codebases and generate documentation.
1.  **Repository Fetching**: The `downloadRepo` function in `src/lib/downloadRepo.ts` fetches a Git repository as a zip archive from various providers.
2.  **File Extraction & Parsing**: The `extractFile` function in `src/lib/zipExtract.ts` unzips the archive and uses `tree-sitter` (via `src/lib/ast.ts`) to parse the source code of supported languages into ASTs.
3.  **AI-Powered Generation**: The ASTs are sent to the Google Gemini API via functions in `src/lib/ai.ts`. A detailed prompt guides the AI to generate either technical architecture documentation or an API reference based on the AST structure.
4.  **Database Storage**: The generated Markdown is stored in the `Documentation` table, linked to the user's project.
