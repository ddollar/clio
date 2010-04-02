require "rubygems"
require "rest_client"

AUTH_KEY = 'owgnsfn83yh3pntb!lh93ydkgjbmsdf'

resource = RestClient::Resource.new("http://localhost:8000", :headers => {
  'Authorization' => AUTH_KEY,
  'Cloud'         => 'heroku.com'
})

slug_id = "0000"

session_url = resource["/sessions"].post(slug_id)

loop do
  begin
    puts resource[session_url].get
  rescue RestClient::NotModified
  ensure
    sleep 1
  end
end
