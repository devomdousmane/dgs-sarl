# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DGS-Sarl is a web project for the DGS SARL business. It uses **Framer Motion** for animations and is intended to be built with React.

## Current State

The project is in early setup. No build tool, scripts, or source files exist yet. The `docs/` folder contains business media assets (PDFs, images, videos).

## Dependencies

- `framer-motion` ^12.40.0 — requires React 18+ and `react-dom` as peer dependencies (not yet installed)

## Setup Notes

Before writing application code, the following are needed:
- Install React: `npm install react react-dom`
- Add a build tool (e.g., Vite): `npm create vite@latest` or `npm install --save-dev vite @vitejs/plugin-react`
- Add scripts to `package.json` (`dev`, `build`, `lint`, `test`)