const Endpoints = {
	seeker: "http://localhost:80/seeker/",
	seekers: "http://localhost:80/seekers/",
	shelter: "http://localhost:80/shelter/",
	token: "http://localhost:80/api/token/",
	search: "http://localhost:80/pets/results/",
	updateshelter: "http://localhost:80/shelter/:pk/",
	updateseeker: "http://localhost:80/seeker/:pk/",
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
