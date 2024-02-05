
## API Reference

### 1.  User

#### Register User

```http
  POST /register

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Sign In  User

```http
 POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. |
| `password`      | `string` | **Required**. |


#### New Verification Email Request

```http
 GET verifyEmail/:verification_token/:email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `verification_token`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |


#### Sign In or Sign Up user using Google Auth

```http
POST /create-session

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| Google authentication parameters	      |  | **Required**. |


---
### Board Creation
#### Create New Project

```http
POST /project/newproject
```
| Parameter     | Type       | Description                                      |
| ------------- | ---------- | ------------------------------------------------ |
| created_by    | string     | The creator or author of the Project.             |
| title         | string     | The title or name of the Project.                 |
| description   | string     | A detailed description of the Project.           |
| AddedGitRepo  | string     | The Git repository associated with the Project.  |
| timeline      | Date       | The timeline or date associated with the Project. (Parsed from string) |
| keyword       | string     | A keyword or tag associated with the Project.    |
| color         | string     | The color code or name associated with the Project. |

#### Update Project


```http
PUT project/updateproject/:id
```