\*notepad docs/grill-me.md\*



I want to build a simple To-Do API using Node.js. Grill my idea.

claude's response: Alright, let's stress-test this.



What's your data layer?



Are you planning in-memory storage, a JSON file, SQLite, or a proper database like PostgreSQL? In-memory is fine for learning but worthless the moment your server restarts. File-based storage invites race conditions. If you're serious about deploying this, you need a real database—and with it comes connection pooling, migrations, and ORM decisions.



How are you handling authentication?



A to-do API without auth is just a public notepad. Are you going with JWTs, sessions, OAuth, or punting on this entirely? If JWTs, are you storing them properly on the client side? Are you implementing refresh tokens, or will users get logged out constantly?



What's your framework choice and why?



Express is the obvious default, but it's barely maintained and encourages callback soup without guardrails. Fastify is faster and has better validation built in. Hono is lightweight and modern. NestJS gives you structure but adds complexity. What's driving your decision—familiarity, performance, or just "it's what the tutorial used"?



How are you validating input?



If someone sends { "title": null, "completed": "maybe" }, what happens? Are you using Zod, Joi, AJK, or writing manual checks that'll inevitably miss edge cases?



What does "simple" actually mean to you?

• CRUD only, or do you want filtering, sorting, pagination?

• Single user or multi-tenant?

• Due dates, priorities, tags, subtasks—or truly bare-bones?

• Any real-time requirements (WebSockets for live updates)?



What's the deployment story?



Running locally forever, or do you intend to ship this? If shipping: containerized or not? Managed hosting (Render, Railway, Fly) or raw VPS? How are you handling environment variables and secrets?





