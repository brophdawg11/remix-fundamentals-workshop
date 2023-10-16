# Remix Fundamentals Workshop

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
npm install
```

## Examples

This workshop contains an ordered set of examples we'll work through (ie., `1-basic`, `2-data`, etc.). Each example is a self-contained Remix application. Each example also contains a `-final` directory that shows the ending state for the exercise - feel free to peek at these if you get stuck!

### 👉 Run an app

This repository uses npm workspaces, so you can run an individual app using the `-w` flag, which is the same as running `npm run dev` from that directory:

```sh
# from the root of this repository
npm run dev -w 1-basic
```

Or you can run the apps directly from their directories:

```sh
cd 1-basic
npm run dev
```

### 👉 Check the README for each example

Each example will have a list of instructions, links, and tips for completing the work. The code in `app/` is your starting point. We'll briefly review the starting/ending points, discuss the instructions, and then you'll have some time to work on implementing the steps (solo, or pair up with a buddy!).

The instructions and provided code is minimal _by design_! The goal of the workshop is not just to simply give you the answers, but to get you comfortable using the Remix and MDN docs to help you figure out the path forward (you should get much better recall in this manner 😉).

If you get stuck, there is a working version of each exercise in a `-final` workspace, so you can run that to see the final state (`npm run dev -w 1-basic-final`) or peek at the code if you need a hint. The idea is not to end up with the same exact UX as the "final" state - but the same general functionality. So don't stress over styles, or matching the underlying implementation exactly.
