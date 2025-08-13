# Reading List App

A Next.js application for managing your personal reading list with books, authors, and read status tracking.

## Features

- 📚 Add new books with title and author
- ✅ Mark books as read/unread
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔒 Server-side validation with Zod schemas
- 🗄️ Persistent data storage with Prisma
- 🧪 Comprehensive test coverage

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

### Current Test Coverage

I've set up testing with **Vitest** and **React Testing Library**:

- **Validation Tests**: 5 tests covering all Zod schema validation logic
- **Component Tests**: 4 tests covering UI component functionality
- **Total**: 9 tests with 100% pass rate

### Running Tests

```bash
# Run all tests
npm run test:run
```

## What Could Be Added With More Time

### Additional Unit Tests

- **More Component Tests**: Test all remaining components (BookCard, BookList, NewBookModal, NewBookButton)
- **Service Layer Tests**: Test repository and data access logic
- **Action Tests**: Test server actions with proper mocking
- **Integration Tests**: Test component interactions and data flow

### E2E Testing with Cypress

If I had more time, I'd add comprehensive Cypress tests:

**Stuff I'd test with Cypress:**

- Adding new books through the UI
- Toggling book read status
- Form validation and error handling
- Responsive design on different screen sizes

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests in watch mode
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Prisma with SQLite
- **Validation**: Zod
- **Testing**: Vitest, React Testing Library, user-event
- **Development**: ESLint, Turbopack

## Contributing

Feel free to contribute! Just make sure to:

1. Fork the repo
2. Create a feature branch
3. Add tests for new stuff
4. Make sure all tests pass
5. Submit a PR

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev/)
