require 'net/http';
uri = 'https://victraffic-api.wd.com.au/api/v3/incidents';
body = Net::HTTP.get_response(URI.parse(self)).body;

p result
# ... HTML source of www.google.com ...