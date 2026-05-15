const pkg = require('../../package.json');

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'RBAC Leave Policy API',
    version: pkg.version || '1.0.0',
    description: 'Swagger (OpenAPI) docs for the RBAC Leave Policy API.',
  },
  servers: [
    { url: '/', description: 'Current host' },
  ],
  tags: [
    { name: 'Health', description: 'Service health checks' },
    { name: 'Auth', description: 'Authentication and session endpoints' },
    { name: 'Policies', description: 'Leave policy workflows' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Send `Authorization: Bearer <accessToken>` (or use the `accessToken` cookie).',
      },
    },
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { nullable: true },
        },
      },
      ApiError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string' },
          errors: { type: 'array', items: { type: 'string' } },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password', 'role'],
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
          email: { type: 'string', example: 'jane@example.com' },
          password: { type: 'string', example: 'StrongP@ssw0rd' },
          role: { type: 'string', example: 'employee', description: 'One of: employee, hr, manager' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'jane@example.com' },
          password: { type: 'string', example: 'StrongP@ssw0rd' },
        },
      },
      PolicyCreateRequest: {
        type: 'object',
        required: ['title', 'description', 'days'],
        properties: {
          title: { type: 'string', example: 'Annual Leave Policy' },
          description: { type: 'string', example: 'Annual leave policy for FY 2026.' },
          days: { type: 'integer', example: 18 },
        },
      },
      PolicyStatusUpdateRequest: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { type: 'string', example: 'approved', description: 'One of: approved, rejected' },
          comment: { type: 'string', example: 'Looks good.' },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          200: {
            description: 'API is running',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } },
            },
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a user',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } },
          },
        },
        responses: {
          201: { description: 'User registered' },
          400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } },
          },
        },
        responses: {
          200: { description: 'Logged in' },
          400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Current user' },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/auth/refresh-token': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh access token',
        responses: {
          200: { description: 'Token refreshed' },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout',
        responses: {
          200: { description: 'Logged out' },
        },
      },
    },
    '/api/policies': {
      post: {
        tags: ['Policies'],
        summary: 'Create a leave policy (HR only)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/PolicyCreateRequest' } },
          },
        },
        responses: {
          201: { description: 'Created' },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          403: { description: 'Forbidden', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      get: {
        tags: ['Policies'],
        summary: 'Get approved policies (Employee/HR/Manager)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Approved policies' },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          403: { description: 'Forbidden', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/policies/mine': {
      get: {
        tags: ['Policies'],
        summary: 'Get policies created by me (HR only)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'My policies' },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          403: { description: 'Forbidden', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/policies/pending': {
      get: {
        tags: ['Policies'],
        summary: 'Get pending policies (Manager only)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Pending policies' },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          403: { description: 'Forbidden', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/policies/{id}/status': {
      patch: {
        tags: ['Policies'],
        summary: 'Approve/reject a policy (Manager only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/PolicyStatusUpdateRequest' } },
          },
        },
        responses: {
          200: { description: 'Updated status' },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          403: { description: 'Forbidden', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
  },
};

