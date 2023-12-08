const Endpoints = {
	seeker: "https://pet-pal-web-backend-alligators.vercel.app/seeker/",
	seekers: "https://pet-pal-web-backend-alligators.vercel.app/seekers/",
	shelter: "https://pet-pal-web-backend-alligators.vercel.app/shelter/",
	shelters: "https://pet-pal-web-backend-alligators.vercel.app/shelters/",
	shelterlists: "https://pet-pal-web-backend-alligators.vercel.app/shelterlists/",
	token: "https://pet-pal-web-backend-alligators.vercel.app/api/token/",
	search: "https://pet-pal-web-backend-alligators.vercel.app/pets/results/",
	pet: "https://pet-pal-web-backend-alligators.vercel.app/pets/:pk/",
	application: "https://pet-pal-web-backend-alligators.vercel.app/applications/",
	applicationfilled: "https://pet-pal-web-backend-alligators.vercel.app/applications/:pk/",
	applicationcomments: "https://pet-pal-web-backend-alligators.vercel.app/applications/:pk/comment/",
	updateshelter: "https://pet-pal-web-backend-alligators.vercel.app/shelter/:pk/",
	updateseeker: "https://pet-pal-web-backend-alligators.vercel.app/seeker/:pk/",
	pets: "https://pet-pal-web-backend-alligators.vercel.app/pets/",
	specificshelter: "https://pet-pal-web-backend-alligators.vercel.app/shelter/:pk/",
	specificseeker: "https://pet-pal-web-backend-alligators.vercel.app/seeker/:pk/",
	petresults: "https://pet-pal-web-backend-alligators.vercel.app/pets/results/",
	applications: "https://pet-pal-web-backend-alligators.vercel.app/applications/",
	notifs: "https://pet-pal-web-backend-alligators.vercel.app/notifications/",
	sheltercomments: "https://pet-pal-web-backend-alligators.vercel.app/shelter/:pk/comment/",
	specificpet: "https://pet-pal-web-backend-alligators.vercel.app/pets/:pk/",
	google: `https://pet-pal-web-backend-alligators.vercel.app/google/`,
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
