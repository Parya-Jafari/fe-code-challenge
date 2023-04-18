General Notes:
- Unit tests were added for the Modal component and the SpotDetails that uses it. More tests need to be written for the Checkout and the Confirmation pages given more time.

- The `redux-persist` package was added to ensure persistent states when the user is using the app. This helps keep the states in the redux store even if the user refreshes their page. To make this happen without persistent states, we can add the spot's id to the URL of the checkout as such /checkout/id (or the reservation's id in the case of the Confirmation page). This way, we can use react-router's parameter matching and fetch the spot using its id if the state is `null` after a page reload. 

- Currently, reserving a spot does not remove it from the search results. This can result in duplicate reservations for the same spot. Solving this issue seems out of the scope of this exercise but here is how I would approach it: 
One option is to remove the spot from the search results by using `DELETE /spots/:id` - where `id` is the reserved spot's id after the reservation is confirmed. Or simply filtering the spots vs the list reservations returned from `GET /reservations`. However, a better solution is to let the backend handle filtering the list of `spots` based on what is not reserved. The front end can perform a mutation on the `/spots` endpoint to get the most updated.

- We can consider "holding" a spot (e.g. by adding a lock to it in the db) for a short time while the user is in the process of checkout. This can ensure that when many users use this app at the same time, they are able to select and purchase any spot they initially select on the list.

Step 1:
- The background color of the Modal in the provided design did not exist as part of the branded colors in the application. A design decision was made here to not add an additional color in the default palette of the app (and in the BrandUtils). Instead, a visually close color that existed in the brand colors was used. The reason for this was to maintain the semantic nature of the colors.
- Ideally, we want to make the page responsive for different screen sizes. For this exercise, the modal is allowed to be scrollable if the content overflows. Given a comprehensive design for various sizes, we can make this page better (e.g. using media queries).
 
Step 2
- The form was created to follow the provided design closely. Including the error states and the focus states. 
- A `checkout` reducer was created to hold the relevant information to the checkout. For this exercise, this only included the `email` field. But this can be expanded.
- Form validation is performed to make sure that the email is in the proper format and that the provided phone only consists of digits. However, it is important to complement this client-side validation with server-side ones. A user can still modify the HTML so we cannot solely rely on this validation for any security purposes.
 
