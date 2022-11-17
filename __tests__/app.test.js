const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  return db.end();
});

describe("GET-/api/categories", () => {
  test("GET - 200: Responds with an array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(4);
        body.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET-/api/reviews", () => {
  test("GET-200: Responds with array of review objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(13);
        body.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              designer: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("GET - 200: Responds with array of reviews filted by category", () => {
    return request(app)
      .get("/api/reviews?category=dexterity")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body).toMatchObject([
          {
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            category: "dexterity",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
          },
        ]);
      });
  });
  test("GET - 400: Invalid category", () => {
    return request(app)
      .get("/api/reviews?category=driving")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid category");
      });
  });
  test("GET - 200: Responds with an array sorted by the query", () => {
    return request(app)
      .get("/api/reviews?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("title", { descending: true });
      });
  });
  test("GET - 400: Ivalid sort query", () => {
    return request(app)
      .get("/api/reviews?sort_by=game")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort query");
      });
  });
  test("GET - 200: Responds with an array of reviews ordered by the query", () => {
    return request(app)
      .get("/api/reviews?order=desc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("GET - 400: Invalid order query", () => {
    return request(app)
      .get("/api/reviews?order=hello")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });
  test("GET - 200: Responds with an array of reviews that has been sorted, ordered and categorised", () => {
    return request(app)
      .get("/api/reviews?category=social deduction&sort_by=title&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("title", { descending: false });
        expect(body.length).toBe(11);
        body.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: "social deduction",
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              designer: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("/api/reviews/:review_id", () => {
  test("GET - 200: Returns the review with the correct ID", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          review_id: 3,
          title: "Ultimate Werewolf",
          review_body: "We couldn't find the werewolf!",
          designer: "Akihisa Okui",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          votes: 5,
          category: "social deduction",
          owner: "bainesface",
          created_at: "2021-01-18T10:01:41.251Z",
        });
      });
  });
  test("GET - 200: Returns the review with an added comment_count property", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          review_id: 3,
          title: "Ultimate Werewolf",
          review_body: "We couldn't find the werewolf!",
          designer: "Akihisa Okui",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          votes: 5,
          category: "social deduction",
          owner: "bainesface",
          created_at: "2021-01-18T10:01:41.251Z",
          comment_count: 3,
        });
      });
  });
  test("GET - 400: Bad request", () => {
    return request(app)
      .get("/api/reviews/dog")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("GET - 400: Good request but id does not exist", () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Id not found");
      });
  });
});
describe("/api/reviews/:review_id/comments", () => {
  test("GET - 200: Returns the review with the correct ID", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body).toBeSortedBy("created_at", { descending: true });
        body.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              review_id: expect.any(Number),
            })
          );
        });
      });
  });
  test("GET - 200: Returns an empty array if a review has no comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(0);
        expect(body).toEqual([]);
      });
  });
  test("GET - 400: Bad request", () => {
    return request(app)
      .get("/api/reviews/dog/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("GET - 404: Good request but id does not exist", () => {
    return request(app)
      .get("/api/reviews/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Id not found");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("POST - 201: Responds with the posted comment", () => {
    const input = {
      username: "mallionaire",
      body: "Amazing game!",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body.postedComment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: "mallionaire",
            body: "Amazing game!",
            review_id: 1,
          })
        );
      });
  });
  test("POST - 404 responds with an appropriate error message when provided with an invalid username ", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "DarthShan", body: "Woop Woop" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Username does not exist");
      });
  });
  test("GET - 400: Bad request", () => {
    return request(app)
      .get("/api/reviews/dog/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("GET - 404: Good request but id does not exist", () => {
    return request(app)
      .get("/api/reviews/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Id not found");
      });
  });
  test("POST - 400 responds with an appropriate error message when username is mispelled ", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ usernam: "mallionaire", body: "Woop Woop" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("POST - 400 responds with an appropriate error message when body is mispelled ", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "mallionaire", boy: "Woop Woop" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("PATCH - 200: Responds with updated review", () => {
    const incVote = { inc_vote: 1 };
    return request(app)
      .patch("/api/reviews/1")
      .send(incVote)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Farmyard fun!",
          review_id: 1,
          category: "euro game",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: 2,
        });
      });
  });
  test("PATCH - 400 responds with an appropriate error message when provided with an invalid inc_vote", () => {
    const incVote = { inc_vote: "hello" };
    return request(app)
      .patch("/api/reviews/1")
      .send(incVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("PATCH - 400: Bad request", () => {
    return request(app)
      .patch("/api/reviews/dog")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("PATCH - 404: Good request but id does not exist", () => {
    return request(app)
      .patch("/api/reviews/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Id not found");
      });
  });
  test("PATCH - 400 responds with an appropriate error message when inc_vote is mispelled ", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ in_vote: 2 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("GET /api/users", () => {
  test("GET - 200: Responds with an array of user data", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        body.users.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("404 Route not found Error handling", () => {
  test("GET - 404: Route not found", () => {
    return request(app)
      .get("/api/category")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not found");
      });
  });
});
