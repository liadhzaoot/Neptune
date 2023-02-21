# LIAD HAZOOT :)
### 1. If you would need to compare metadata between different timestamps, how would you approach it?

Because we are saving the data in different collection: `column_metadata`, `table_metadata`, `database_metadata` we can track the changes for each document entity, first of all create a field called ```updated_at``` for each document in the collection. and check for each document if the field ```updated_at``` changed if yes, check which fields has changed if no there is no need to check this document.
in addition we need to check if the `document_id` is exist in the other metadata. and save all the difference data. 
BTW if there is a better way (best practice) i would like to hear :)


### 2. What was the most challenging part of this assignment?
the most challenging part of this assignment for me was understanding Typescript in the react frontend :) and think about the best practice of saving the data in MongoDB for fast queries. I use 2 options, and I would like to discuss about them

### 3.Did you enjoy this assignment?
Yes ! it was fun to know new technologies and implement new features in short time. Databases is huge and fast growing world.

### 4.Knowing a little bit about Matia, what technical challenges do you think that Matia faces? How would you approach the challenges you mentioned?
I think Matia faces with make the platform custumized and generic in the same time. Matia needs to deal with alot of challenging databases and fast growing companies that trust Matia to handle with all the databases problems.</br> 
I think Matia can be one of the biggest company not necessarily
because of the product but because of the team.
CARE: </br>
C - Customer: listen to the market </br> 
A - Action: do not talk... do! </br>
R - Relationship: be on good relationships with your friend, family and co-workers </br>
E - Environment: surround yourself with good people  </br>

# Run 

```docker-compose up ``` </br>
recomended to open the chrome with the following command because of CORS issue</br>
```open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security```