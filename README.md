# Remix Fundamentals Workshop - Connect.Tech 2023

Welcome to the workshop repo! Let's get you set up.

## Setup

You will need the following tools to run the apps in this project:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18)

### 👉 Clone the repo:

```sh
# SSH
git clone git@github.com:brophdawg11/remix-fundamentals-workshop.git

# HTTP
git clone https://github.com/brophdawg11/remix-fundamentals-workshop.git

# Github CLI
gh repo clone brophdawg11/remix-fundamentals-workshop

# or however you clone repos
```

### 👉 Install dependencies

```sh
cd remix-fundamentals-workshop
npm ci
```

### 👉 Run an app

```sh
# from the root of this repository
npm run dev -w 1-basic
```

This project uses npm workspaces, so that command is the same as changing into the "1-basic" directory and running `npm run dev` there.

```sh
cd 1-basic
npm run dev
```

### 👉 Check the README for each topic

Each topic will have a list of instructions, links, and tips for completing the work. The code in `app/` is your starting point. We'll briefly review the starting point, discuss the instructions, and then you'll have some time to work on implementing the steps (solo, or pair up with a buddy!).

The instructions and code is light _by design_! The goal of the workshop is not just to simply give you the answers, but to get you comfortable using the Remix and MDN docs to help you figure out the path forward (you should get much better recall in this manner 😉).

If you get stuck, there is a working version of the `app/` dir in `/final` tht you can peek at. I would not recommend recursively copying that into app since you may end up losing any other progress you've already made!
