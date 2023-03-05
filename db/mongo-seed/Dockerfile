FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db products --collection products --type json --file /init.json --jsonArray