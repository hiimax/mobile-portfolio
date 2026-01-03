package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// API Handlers
func handleConfig(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" { return }

	if r.Method == "GET" {
		DB.mu.RLock()
		json.NewEncoder(w).Encode(DB.Data.Config)
		DB.mu.RUnlock()
	} else if r.Method == "POST" {
		var newConfig SiteConfig
		if err := json.NewDecoder(r.Body).Decode(&newConfig); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		DB.mu.Lock()
		DB.Data.Config = newConfig
		DB.mu.Unlock()
		SaveDB()
		json.NewEncoder(w).Encode(DB.Data.Config)
	}
}

func handleProjects(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" { return }

	if r.Method == "GET" {
		DB.mu.RLock()
		// Convert map to array for frontend
		projects := []Project{}
		for _, p := range DB.Data.Projects {
			projects = append(projects, p)
		}
		json.NewEncoder(w).Encode(projects)
		DB.mu.RUnlock()
	}
}

func handleProjectDetail(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" { return }
    
    id := r.URL.Query().Get("id")
    
    if r.Method == "GET" {
        DB.mu.RLock()
        project, exists := DB.Data.Projects[id]
        DB.mu.RUnlock()
        
        if !exists {
            http.Error(w, "Project not found", 404)
            return
        }
        json.NewEncoder(w).Encode(project)
    }
}

func main() {
	// Initialize Database
	InitDB()

	// Static Files with Mime Types
    fs := http.FileServer(http.Dir("../website"))
    adminFs := http.FileServer(http.Dir("../admin"))

	// Handlers
    // Use StripPrefix to correctly map /admin/ to admin folder
	http.Handle("/admin/", http.StripPrefix("/admin/", adminFs))
    http.Handle("/", fs)
	
	http.HandleFunc("/api/config", handleConfig)
	http.HandleFunc("/api/projects", handleProjects)
	http.HandleFunc("/api/project", handleProjectDetail)

	port := ":8080"
	fmt.Printf("🚀 Server running on http://localhost%s\n", port)
	
	log.Fatal(http.ListenAndServe(port, nil))
}
