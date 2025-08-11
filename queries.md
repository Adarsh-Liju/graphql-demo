# Queries

---

## **1️⃣ Basic Queries**

**Get all students**

```graphql
query {
  students {
    id
    name
    age
  }
}
```

**Get a single student by ID**

```graphql
query {
  student(id: "1") {
    id
    name
    age
  }
}
```

---

## **2️⃣ Nested Queries**

**Get students with their courses**

```graphql
query {
  students {
    id
    name
    courses {
      id
      title
      description
    }
  }
}
```

**Get courses with enrolled students**

```graphql
query {
  courses {
    id
    title
    students {
      id
      name
    }
  }
}
```

---

## **3️⃣ Query with Arguments & Filters**

**Find courses by title keyword**

```graphql
query {
  courses(titleContains: "GraphQL") {
    id
    title
    description
  }
}
```

**Get students older than a certain age**

```graphql
query {
  studentsOlderThan(age: 20) {
    name
    age
  }
}
```

---

## **4️⃣ Mutations**

**Add a student**

```graphql
mutation {
  addStudent(name: "Alice", age: 22) {
    id
    name
    age
  }
}
```

**Add a course**

```graphql
mutation {
  addCourse(title: "GraphQL Basics", description: "Learn GraphQL step by step") {
    id
    title
    description
  }
}
```

**Enroll a student in a course**

```graphql
mutation {
  enrollStudent(studentId: "1", courseId: "101") {
    id
    name
    courses {
      title
    }
  }
}
```

---

## **5️⃣ Subscriptions**

**Listen for new students**

```graphql
subscription {
  studentAdded {
    id
    name
    age
  }
}
```

**Listen for course enrollments**

```graphql
subscription {
  studentEnrolled {
    student {
      name
    }
    course {
      title
    }
  }
}
```
