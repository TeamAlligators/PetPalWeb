const Endpoints = {
	seeker: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/seeker/",
	seekers: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/seekers/",
	shelter: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/shelter/",
	shelters: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/shelters/",
	shelterlists: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/shelterlists/",
	token: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/api/token/",
	search: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/pets/results/",
	pet: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/pets/:pk/",
	application: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/applications/",
	applicationfilled: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/applications/:pk/",
	applicationcomments: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/applications/:pk/comment/",
	updateshelter: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/shelter/:pk/",
	updateseeker: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/seeker/:pk/",
	pets: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/pets/",
	specificshelter: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/shelter/:pk/",
	specificseeker: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/seeker/:pk/",
	petresults: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/pets/results/",
	applications: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/applications/",
	notifs: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/notifications/",
	sheltercomments: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/shelter/:pk/comment/",
	specificpet: "http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/pets/:pk/",
	google: `http://pet-pal-web-backend-phjvl6y6h-alligators.vercel.app/google/`,
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
