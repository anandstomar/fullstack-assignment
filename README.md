# Flipr-assignment
Here is a simple, professional documentation structure for your project. You can save this as a `README.md` file in your GitHub repository or submit it as a separate document.

I have structured this to map directly to the requirements mentioned in the assignment PDF to show the evaluator you have covered all bases.

---

# Project Documentation: Full Stack Application

**Repository:** [https://github.com/anandstomar/Flipr-assignment](https://github.com/anandstomar/Flipr-assignment)

## 1. Project Overview

This application is a full-stack solution consisting of a public-facing **Landing Page** and a restricted **Admin Panel**. It allows the site owner to manage content (projects, clients) dynamically and collect user data (consultation requests, newsletter subscriptions).

## 2. Tech Stack Used

* **Frontend:** React.js (or Next.js if you used that) / HTML / CSS
* **Backend:** Node.js / Express.js
* 
**Database:** MongoDB Atlas (Cloud Database) 


* 
**Version Control:** Git & GitHub 


* 
**Deployment:** [Insert your platform here, e.g., Vercel/Render/Heroku/AWS] 



---

## 3. Step-by-Step Implementation Guide

### Step 1: Project Architecture & Setup

I structured the application into two main directories: `client` (frontend) and `server` (backend). I initialized a Git repository to track version history and ensure code organization.

### Step 2: Database Design (MongoDB)

I designed four main data schemas to meet the data management requirements:

1. **Projects:** Stores image URL, name, and description .


2. **Clients:** Stores image URL, name, description, and designation .


3. **Contacts:** Stores form submissions (Name, Email, Mobile, City) .


4. **Subscribers:** Stores email addresses for the newsletter.



### Step 3: Backend API Development

I created a RESTful API to handle data flow between the database and the frontend:

* **Public Endpoints:**
* 
`GET /projects`: Fetches all projects for the "Our Projects" section.


* 
`GET /clients`: Fetches client testimonials for "Happy Clients".


* 
`POST /contact`: Receives contact form submissions.


* 
`POST /subscribe`: Receives newsletter subscriptions.




* **Admin Endpoints:**
* 
`POST /admin/project`: Adds new projects.


* 
`POST /admin/client`: Adds new client details.


* 
`GET /admin/contacts`: Retrieves all contact form inquiries.


* 
`GET /admin/subscribers`: Retrieves all subscribed emails.





### Step 4: Frontend Development (Landing Page)

I built a responsive landing page closely following the provided reference design:

* 
**Dynamic Sections:** The "Our Project" and "Happy Clients" sections are not hardcoded; they fetch data from the backend API on page load.


* 
**Forms:** Implemented the "Get a Free Consultation" form and Newsletter input with validation to ensure correct data is sent to the backend.



### Step 5: Frontend Development (Admin Panel)

I created a dashboard interface for content management:

* 
**Input Forms:** Created forms for the admin to easily upload project and client details.


* 
**Data Visualization:** Created tables to display incoming contact requests and subscriber lists in a readable format.



### Step 6: Deployment

* 
**Database:** Connected the application to a live MongoDB Atlas cluster.


* 
**Hosting:** Deployed the frontend and backend to [Insert Platform] to ensure the application is publicly accessible as required.



---

## 4. How to Run Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**
```bash
git clone https://github.com/anandstomar/Flipr-assignment

```


2. **Setup Backend:**
```bash
cd server
npm install
# Create a .env file and add your MONGO_URI
npm start

```


3. **Setup Frontend:**
```bash
cd client
npm install
npm start

```


4. **Access:** Open `http://localhost:3000` in your browser.



