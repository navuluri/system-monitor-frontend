# Contributing to System Monitor

Thank you for your interest in contributing to System Monitor! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### Our Standards

- **Be respectful** and inclusive
- **Be constructive** in feedback
- **Be collaborative** and help others
- **Focus on what's best** for the community

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher
- PostgreSQL 14 or higher
- Git

### Setting Up Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork:**
   ```bash
   git clone https://github.com/navuluri/system-monitor.git
   cd system-monitor
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/original-owner/system-monitor.git
   ```

4. **Install dependencies:**
   ```bash
   pnpm install
   ```

5. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

6. **Set up the database:**
   ```bash
   createdb system_monitor
   psql -d system_monitor -f lib/scripts.sql
   ```

7. **Run the development server:**
   ```bash
   pnpm dev
   ```

## 🔄 Development Process

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name develop
```

### Making Changes

1. **Keep commits atomic** - One logical change per commit
2. **Write meaningful commit messages:**
   ```
   feat: Add CPU temperature monitoring
   
   - Add temperature sensor reading
   - Display temperature in CPU component
   - Add temperature threshold alerts
   
   Closes #123
   ```

3. **Follow conventional commits:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

### Staying Up to Date

```bash
git fetch upstream
git rebase upstream/develop
```

## 🔀 Pull Request Process

### Before Submitting

1. **Ensure your code passes all checks:**
   ```bash
   pnpm lint
   pnpm build
   ```

2. **Test your changes thoroughly**

3. **Update documentation** if needed

4. **Add tests** for new features

### Submitting a PR

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub

3. **Fill out the PR template:**
   - Description of changes
   - Related issue numbers
   - Screenshots (if UI changes)
   - Testing done
   - Breaking changes

4. **Request review** from maintainers

### PR Review Process

- Maintainers will review your PR within 3-5 business days
- Address any requested changes
- Once approved, a maintainer will merge your PR

### PR Requirements

- ✅ Passes all CI checks
- ✅ Code follows style guidelines
- ✅ Includes appropriate tests
- ✅ Documentation is updated
- ✅ No merge conflicts
- ✅ Approved by at least one maintainer

## 💻 Coding Standards

### TypeScript

- Use **strict mode** TypeScript
- Prefer **interfaces** over types when possible
- Use **explicit return types** for functions
- Avoid `any` - use `unknown` if type is truly unknown

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad
function getUser(id: any): any {
  // ...
}
```

### React Components

- Use **functional components** with hooks
- Prefer **named exports** over default exports
- Use **TypeScript** for prop types
- Keep components **focused and small**

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// ❌ Bad
export default function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### API Routes

- Always **validate input** with Zod
- Implement **proper error handling**
- Return **appropriate HTTP status codes**
- Include **timeout handling**

```typescript
// ✅ Good
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = querySchema.safeParse({
      host: searchParams.get('host'),
      port: searchParams.get('port'),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }
    // ... rest of logic
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### File Naming

- **Components:** PascalCase (`Button.tsx`)
- **Utilities:** camelCase (`formatDate.ts`)
- **API Routes:** lowercase (`route.ts`)
- **Types/Interfaces:** PascalCase in `definitions.ts`

### Code Style

- Use **Biome** for formatting and linting
- Run `pnpm lint` before committing
- Use **2 spaces** for indentation
- Use **semicolons**
- Use **single quotes** for strings (unless JSX)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

- Write tests for all new features
- Aim for at least 80% code coverage
- Test both success and error cases
- Use descriptive test names

```typescript
// Example test
import { describe, it, expect } from 'vitest';
import { systemQuerySchema } from '@/lib/validation';

describe('systemQuerySchema', () => {
  it('should validate correct input', () => {
    const result = systemQuerySchema.safeParse({
      host: 'example.com',
      port: '8080',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid port', () => {
    const result = systemQuerySchema.safeParse({
      host: 'example.com',
      port: 'invalid',
    });
    expect(result.success).toBe(false);
  });
});
```

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Verify the bug exists in the latest version
3. Collect relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
 - OS: [e.g., Windows 11]
 - Browser: [e.g., Chrome 120]
 - Node.js: [e.g., 20.10.0]
 - Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem

**Describe the solution you'd like**
What you want to happen

**Describe alternatives you've considered**
Other solutions you've considered

**Additional context**
Mockups, examples, etc.
```

## 📚 Documentation

### Documentation Standards

- Update README.md for user-facing changes
- Add JSDoc comments for public APIs
- Update API documentation for new endpoints
- Include code examples

### JSDoc Example

```typescript
/**
 * Fetches system metrics from a monitoring agent
 * 
 * @param host - The hostname or IP address of the target server
 * @param port - The port where the monitoring agent is running
 * @returns Promise resolving to system metrics
 * @throws {Error} If the request fails or times out
 * 
 * @example
 * ```typescript
 * const metrics = await fetchSystemMetrics('example.com', 8080);
 * console.log(metrics.cpu_percent);
 * ```
 */
export async function fetchSystemMetrics(
  host: string,
  port: number
): Promise<SystemMetrics> {
  // ...
}
```

## 🎯 Development Tips

### Debugging

- Use browser DevTools
- Check server logs in terminal
- Use `console.error()` for debugging (remove before committing)
- Test in different browsers

### Performance

- Use React DevTools Profiler
- Optimize re-renders with `useMemo` and `useCallback`
- Lazy load components when appropriate
- Monitor bundle size

### Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios

## 🤔 Questions?

- 💬 Open a [Discussion](https://github.com/yourusername/system-monitor/discussions)
- 📧 Email: dev@example.com
- 💻 Join our Discord: [Link]

## 🙏 Thank You!

Your contributions make System Monitor better for everyone. We appreciate your time and effort!

---

**Happy coding! 🚀**

