Creating a shared package for DTOs that can be imported into both your frontend (Angular) and backend (NestJS) projects involves the following steps. The goal is to have a separate shared folder that acts as an independent Node.js package or module, which both projects can import.

Steps to Create a Shared Package for DTOs

1. Set up the Shared Folder

In your project root, create a shared folder for the DTOs:

root/
├── backend/
├── frontend/
├── shared/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│       ├── index.ts
│       ├── dtos/
│           ├── example.dto.ts

2. Initialize a New Node.js Package

Navigate to the shared folder and initialize it as a Node.js package:

cd shared
npm init -y

This generates a package.json file. Edit it to include:

{
  "name": "@shared/dtos",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "clean": "rm -rf dist"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.x"
  }
}

3. Configure TypeScript in the Shared Package

Create a tsconfig.json file inside the shared folder:

{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "module": "commonjs",
    "target": "es2020",
    "moduleResolution": "node",
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

4. Create DTO Files

Inside the src/dtos folder, create an example DTO, e.g., example.dto.ts:

export class ExampleDto {
  id: number;
  name: string;
}

5. Export DTOs in the Index File

Edit the src/index.ts file to export all DTOs:

export * from './dtos/example.dto';

6. Build the Shared Package

Run the build command to compile TypeScript into JavaScript:

npm run build

This generates a dist folder containing the compiled JavaScript files and TypeScript declaration files.

7. Use the Shared Package in Frontend and Backend

Option 1: Link Locally with npm link

To test the package locally before publishing:
	1.	Navigate to the shared directory and link the package:

npm link


	2.	Link the package in the frontend and backend:

cd ../frontend
npm link @shared/dtos

cd ../backend
npm link @shared/dtos



Now, you can import DTOs in your projects like this:

import { ExampleDto } from '@shared/dtos';
