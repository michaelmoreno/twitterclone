Finally, the world is ready. This is the version of Twitter that Silicon Valley doesn't want you to know about.

This is where it gets serious.

This Twitter clone was built using the MERN stack, fully reliant on functional components, hooks, context, and react router.

Our Mongo database has two connections: one for users, and one for tweets. The tweets schema is the most interesting. Any tweet can be a reply. Whenever
any tweet is a reply to another, the id's of each will be saved in each other's objects. This allows the tweets and the their replies to be recursively rendered.

A tip of the hat to Sass, as well.
