# Priviledge Table
(C: create R: read U: update D: delete)
| type         | Dep/Cat/SubCate | Item | Acquisiton | Report |
| ------------ | --------------- | ---- | ---------- | ------ |
| 1. Admin     | CRUD            | CRUD | CRUD       | CRUD   |
| 2. Manager   | R               | CRUD | CRUD       | CRUD   |
| 3. Associate | R               | CR   | CRUD       | CRUD   |
| 4. sale      | -               | -    | -          | CRUD   |
