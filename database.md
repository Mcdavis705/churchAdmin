# Database Design
## PIWC Church ERP

Version: 1.0

---

# Purpose

This document defines the complete database architecture for the PIWC Church ERP.

It acts as the single source of truth for:

- Prisma models
- PostgreSQL database
- Express API
- Frontend forms
- Business rules

No database changes should be made without updating this document first.

---

# Database Technology

Database Engine

- PostgreSQL

Hosted on

- Supabase

ORM

- Prisma

Primary Key Strategy

- UUID

Naming Convention

- camelCase

---

# Entity Relationship Diagram

```text
                    User
                     │
                     │
         ┌───────────┴────────────┐
         │                        │
         │                        │
    Department               Service
         │                        │
         │                        │
         ▼                        ▼
      Member -------------- Attendance
         │
         │
         ▼
      Visitor ---------- FollowUp

      Event
```

---

# Tables

The application currently contains eight primary tables.

1. Users
2. Departments
3. Members
4. Services
5. Attendance
6. Visitors
7. FollowUps
8. Events

---

# Users

Purpose

Stores users that can log into the application.

## Fields

| Field | Type | Required | Notes |
|--------|------|----------|------|
| id | UUID | ✅ | Primary Key |
| firstName | String | ✅ | |
| lastName | String | ✅ | |
| email | String | ✅ | Unique |
| password | String | ✅ | Hashed |
| isActive | Boolean | ✅ | Default true |
| createdAt | DateTime | ✅ | |
| updatedAt | DateTime | ✅ | |

## Relationships

None (Version 1)

---

# Departments

Purpose

Represents church ministries and departments.

Examples

- Media
- Choir
- Youth
- Women
- Men
- Ushering

## Fields

| Field | Type |
|--------|------|
| id | UUID |
| name | String |
| description | String? |
| createdAt | DateTime |
| updatedAt | DateTime |

## Relationships

Department

↓

Many Members

---

# Members

Purpose

Stores every church member.

## Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | ✅ |
| firstName | String | ✅ |
| lastName | String | ✅ |
| gender | Enum | ✅ |
| dateOfBirth | Date | |
| phone | String | |
| email | String | |
| address | String | |
| membershipStatus | Enum | ✅ |
| departmentId | UUID | |
| createdAt | DateTime | ✅ |
| updatedAt | DateTime | ✅ |

## Enums

Gender

- Male
- Female

Membership Status

- Active
- Inactive
- Visitor
- Transferred
- Deceased

## Relationships

Department

1

↓

∞

Members

Member

1

↓

∞

Attendance

---

# Services

Purpose

Represents regular church services.

Examples

- Sunday Worship
- Bible Study
- Prayer Meeting
- Communion Service

## Fields

| Field | Type |
|--------|------|
| id | UUID |
| title | String |
| date | Date |
| time | Time |
| notes | String? |
| createdAt | DateTime |
| updatedAt | DateTime |

## Relationships

Service

↓

Attendance

Service

↓

Visitors

---

# Attendance

Purpose

Stores attendance for each member at every service.

Each record represents

One Member

at

One Service

## Fields

| Field | Type |
|--------|------|
| id | UUID |
| serviceId | UUID |
| memberId | UUID |
| status | Enum |
| checkedInAt | DateTime |
| notes | String? |
| createdAt | DateTime |
| updatedAt | DateTime |

## Attendance Status

- Present
- Absent
- Excused

## Relationships

Attendance

↓

belongs to

↓

Service

Attendance

↓

belongs to

↓

Member

## Constraints

Unique

(serviceId, memberId)

This prevents a member from being marked twice for the same service.

---

# Visitors

Purpose

Stores first-time and returning visitors.

## Fields

| Field | Type |
|--------|------|
| id | UUID |
| fullName | String |
| phone | String |
| email | String? |
| visitDate | Date |
| invitedBy | String? |
| visitorStatus | Enum |
| serviceId | UUID |
| notes | String? |
| createdAt | DateTime |
| updatedAt | DateTime |

## Visitor Status

- First Time
- Returning
- Member

## Relationships

Visitor

↓

belongs to

↓

Service

Visitor

↓

has many

↓

FollowUps

---

# FollowUps

Purpose

Tracks visitor follow-up activities.

## Fields

| Field | Type |
|--------|------|
| id | UUID |
| visitorId | UUID |
| assignedTo | String |
| status | Enum |
| followUpDate | Date |
| completedAt | DateTime? |
| notes | String? |
| createdAt | DateTime |
| updatedAt | DateTime |

## Status

- Pending
- In Progress
- Completed

## Relationships

Visitor

↓

Many FollowUps

---

# Events

Purpose

Represents special church events.

Examples

- Conference
- Wedding
- Youth Camp
- Retreat
- Outreach

## Fields

| Field | Type |
|--------|------|
| id | UUID |
| title | String |
| description | String? |
| venue | String |
| date | Date |
| status | Enum |
| createdAt | DateTime |
| updatedAt | DateTime |

## Event Status

- Planned
- Ongoing
- Completed
- Cancelled

---

# Database Constraints

Users

- Email must be unique.

Departments

- Name must be unique.

Attendance

Unique Constraint

(serviceId, memberId)

Members

Email may be unique if provided.

---

# Indexes

Attendance

- serviceId
- memberId

Members

- lastName
- membershipStatus
- departmentId

Visitors

- visitDate
- visitorStatus

Services

- date

Events

- date

---

# Cascading Rules

Department

Deleting a department should not delete members.

Instead

departmentId becomes NULL.

Service

Deleting a service deletes its attendance records.

Visitor

Deleting a visitor deletes all follow-up records.

---

# Future Tables (Version 2)

These are intentionally excluded from Version 1.

- Roles
- Permissions
- Offerings
- Tithes
- Financial Transactions
- Inventory
- Assets
- Notifications
- Audit Logs
- Branches
- Small Groups
- Volunteer Scheduling

---

# Database Principles

The database follows these principles:

- UUID primary keys
- Soft business logic in backend
- No duplicated data
- Foreign keys for relationships
- Nullable only where appropriate
- Automatic timestamps
- Referential integrity
- Designed for future scalability

---

# Version History

## Version 1.0

Initial database design for PIWC Church ERP.
