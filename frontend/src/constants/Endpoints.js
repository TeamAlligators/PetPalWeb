const Endpoints = {
	seeker: "http://pet-pal-web-backend/seeker/",
	seekers: "http://pet-pal-web-backend/seekers/",
	shelter: "http://pet-pal-web-backend/shelter/",
	shelters: "http://pet-pal-web-backend/shelters/",
	shelterlists: "http://pet-pal-web-backend/shelterlists/",
	token: "http://pet-pal-web-backend/api/token/",
	search: "http://pet-pal-web-backend/pets/results/",
	pet: "http://pet-pal-web-backend/pets/:pk/",
	application: "http://pet-pal-web-backend/applications/",
	applicationfilled: "http://pet-pal-web-backend/applications/:pk/",
	applicationcomments: "http://pet-pal-web-backend/applications/:pk/comment/",
	updateshelter: "http://pet-pal-web-backend/shelter/:pk/",
	updateseeker: "http://pet-pal-web-backend/seeker/:pk/",
	pets: "http://pet-pal-web-backend/pets/",
	specificshelter: "http://pet-pal-web-backend/shelter/:pk/",
	specificseeker: "http://pet-pal-web-backend/seeker/:pk/",
	petresults: "http://pet-pal-web-backend/pets/results/",
	applications: "http://pet-pal-web-backend/applications/",
	notifs: "http://pet-pal-web-backend/notifications/",
	sheltercomments: "http://pet-pal-web-backend/shelter/:pk/comment/",
	specificpet: "http://pet-pal-web-backend/pets/:pk/",
	google: `http://pet-pal-web-backend/google/`,
}

// urlpatterns = [
//     path('shelter/', views.UserShelterCreate.as_view()),
//     path('seeker/', views.UserSeekerCreate.as_view()),
//     path('shelter/<int:pk>/', views.UserShelterRetrieveUpdateDestroy.as_view()),
//     path('seeker/<int:pk>/', views.UserSeekerRetrieveUpdateDestroy.as_view()),
//     path('shelters/', views.UserShelterList.as_view()),

//     path('shelter/<int:pk>/comment/', views.ShelterCommentCreateView.as_view()),
//     path('applications/<int:pk>/comment/', views.ApplicationCommentCreateView.as_view()),

//     path('applications/', views.ApplicationCreateView.as_view()),
//     path('applications/<int:pk>/', views.ApplicationRetrieveUpdate.as_view()),
//     # path('applications/update/<int:pk>/', views.ApplicationUpdateView.as_view()),

//     path('notifications/', views.NotificationList.as_view()),
//     path('notifications/<int:pk>/', views.NotificationDetail.as_view()),

//     path('pets/', views.PetCreateView.as_view()),
//     path('pets/<int:pk>/', views.PetRetrieveUpdateDestroyView.as_view()),
//     path('pets/results/', views.PetSearchView.as_view()),
// ]

export default Endpoints
