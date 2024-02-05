
# Progress

Progress is a Kanban-based sprint tracking facilitates streamlined planning and execution of tasks, providing a visual representation of work, tasks, and progress to facilitate seamless project monitoring. The incorporation of features such as resource sharing with documentation feature akin to Confluence enhances collaborative efforts, fostering a culture of teamwork and knowledge-sharing.





## Demo

Find Demo at - https://progress-two.vercel.app/


![Alt Text](https://i.ibb.co/BLG8HjK/progress-App-Task.png)

## Usage

Once the backend and frontend servers are running in development Environment, you can access the Progress application on [http://localhost:3000](http://localhost:3000).

For Production Environment please check your domain name associated with it.


## Tech Stack

**Client:** React, Shadcn, TailwindCSS, Material Tailwind, React DnD, headlessUI, react-tables, react-icons, react-toastify, Redux

**Server:** Node.js, Express.js, mongoose, Docker, nodemailer, multer

**Other:** Axios, nodemon, jwt, moment, Google Auth, editorjs, imgbb


## Run Locally

1. Clone the repository from


```bash
  git clone https://github.com/mayurjadhav2002/progress
```

2. Close the Backend branch
```bash
  git clone https://github.com/mayurjadhav2002/progress -b backend
```

3. Unzip both files then open the folders in terminal and run following command
```bash
  npm install
```

4. To run this project, you will need to add the following environment variables to your `.env` file


Create  `.env` files in both repo and insert following credentials in it.
- Frontend
``` env  
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_GOOGLE_CLIENT_SECRET=
REACT_APP_IMGBB_CRED=
REACT_APP_BACKEND_URL=
REACT_APP_BACKEND_URL_PROD=
```

- Backend 
```env
PORT=
ENVIRONMENT=prod/dev
BACKEND_URL=
APP_URL=
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
MONGO_URL=
MONGO_LOCAL_URL=
JWT_SECRET_KEY=
EMAIL_ADDRESS=
EMAIL_PASSWORD=
IMGBB_API_KEY=
GOOGLE_AUTH_CLIENT_ID=
```

5. Once done Run following commands to start your application.
- Frontend
```bash
 npm start
 ---- or ---
 npm install -g serve
 serve -s build
```
- Backend
```bash
npm run start:dev
```




## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@mayurjadhav2002](https://www.github.com/mayurjadhav2002)


## Feedback

If you have any feedback, please reach out to us at mayurshrikantjadhav@gmail.com

