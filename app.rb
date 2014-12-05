require 'sinatra'

set :public_folder, Proc.new { File.join("public")}

get '/' do
  erb :index
end
