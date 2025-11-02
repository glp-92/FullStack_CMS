package main

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"

	"fullstackcms/backend/configs"
	"fullstackcms/backend/internal/router"
	"fullstackcms/backend/pkg/auth"
	"fullstackcms/backend/pkg/auth/dto"
	"fullstackcms/backend/pkg/middlewares"

	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

func main() {
	cfg, err := configs.LoadConfig()
	if err != nil {
		log.Fatal(err)
	}
	dbCfg := mysql.Config{
		User:                 cfg.DB.Username,
		Passwd:               cfg.DB.Password,
		Net:                  "tcp",
		Addr:                 cfg.DB.Address,
		DBName:               cfg.DB.DBName,
		AllowNativePasswords: true,
		ParseTime:            true,
	}
	db, err = sql.Open("mysql", dbCfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("DB Connected!")
	authRepo := auth.NewMySQLAuthRepository(db)
	authService := auth.NewAuthService(authRepo, cfg.Auth)
	existingUser, err := authRepo.GetUserDetails(cfg.Blog.Username)
	_ = existingUser
	if errors.Is(err, sql.ErrNoRows) {
		fmt.Println("Blog user does not exist, creating...")
		err = authService.CreateUser(dto.RegisterRequest{
			Username: cfg.Blog.Username,
			Password: cfg.Blog.Password,
		})
		if err != nil {
			log.Fatalf("Error creating user: %v", err)
		}
		fmt.Printf("User '%s' creation success.\n", cfg.Blog.Username)
	} else {
		fmt.Printf("Blog user exists, proceed to launch")
	}
	router.SetupRouter(db, authService)
	log.Printf("Server listening port :%s", cfg.API.APIPort)
	middleware_handler := middlewares.Log(middlewares.CORS(http.DefaultServeMux, cfg.API.FrontendUrl))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", cfg.API.APIPort), middleware_handler))
}
