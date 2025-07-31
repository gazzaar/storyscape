# ERD: storyscape

This document explores the design of storyscape, a blog app for sharing thoughts and ideas.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a relational database, and serving HTTP traffic from a public endpoint.

## Storage

We'll use a relational database to fast retrieval of posts and comments

### Schema

**User:**
| Column | Typt|
| ------ | -------- |
| ID | String|
| username| String|
| password| String |
|email|string|

**Post:**

| Columnt    | Type      |
| ---------- | --------- |
| ID         | String    |
| title      | String    |
| message    | Text      |
| created_at | timestamp |
| published  | Boolean   |
| userID     | String    |

**Comment:**

| Columnt      | Type      |
| ------------ | --------- |
| ID           | String    |
| created_at   | timestamp |
| comment_text | Text      |
| postID       | string    |
| userID       | String    |

## Server

- Node.js is selected for implementing the server for speed of development.
- Express.js is the web server framework.

### API

**Auth:**

```md
/signIn [Post]
/signUp [Post]
/signOut [Post]
```

**Post:**

```md
/posts/list [Get]
/posts/new [Post]
/posts/:id [Get]
/posts/:id [Delete]
```

**Comment:**

```md
/comments/new [POST]
/comments/list [GET]
/comments/:id [DELETE]
```
