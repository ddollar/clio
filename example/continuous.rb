require "rubygems"
require "json"
require "rest_client"

AUTH_KEY = 'owgnsfn83yh3pntb1lh93ydkgjbmsdf'

resource = RestClient::Resource.new("http://localhost:8000", :headers => {
  'Authorization' => AUTH_KEY
})

session_url = resource["/sessions/continuous"].post({ :cloud => "heroku.com", :slug => "0000" }.to_json)

puts "SESSION URL: #{session_url}"

loop do
  print resource[session_url].get
  sleep 1
end
