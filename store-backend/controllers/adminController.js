const db = require("../config/db");

exports.getDashboard = (req, res) => {
  const dashboard = {
    stats: {},
    recentUsers: [],
    ratingChart: [],
    roleChart: [],
    topStores: [],
  };

  db.query("SELECT COUNT(*) total FROM users", (e1, u) => {
    if (e1) return res.status(500).json(e1);

    dashboard.stats.totalUsers = u[0].total;

    db.query("SELECT COUNT(*) total FROM stores", (e2, s) => {
      dashboard.stats.totalStores = s[0].total;

      db.query("SELECT COUNT(*) total FROM ratings", (e3, r) => {
        dashboard.stats.totalRatings = r[0].total;

        db.query(
          "SELECT id,name,email,role FROM users ORDER BY id DESC LIMIT 5",
          (e4, users) => {
            dashboard.recentUsers = users;

            db.query(
              `SELECT rating, COUNT(*) total
               FROM ratings
               GROUP BY rating
               ORDER BY rating`,
              (e5, ratings) => {
                dashboard.ratingChart = ratings;

                db.query(
                  `SELECT role, COUNT(*) total
                   FROM users
                   GROUP BY role`,
                  (e6, roles) => {
                    dashboard.roleChart = roles;

                    db.query(
                      `SELECT s.name,
                              ROUND(AVG(r.rating),1) rating
                       FROM stores s
                       LEFT JOIN ratings r
                       ON s.id=r.store_id
                       GROUP BY s.id
                       ORDER BY rating DESC
                       LIMIT 5`,
                      (e7, stores) => {
                        dashboard.topStores = stores;

                        res.json(dashboard);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  });
};