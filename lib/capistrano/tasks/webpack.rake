# Yarn is mapped to use nvm-exec by way of capistrano-nvm (nvm-exec). See deploy.rb
namespace :webpack do
  task :precompile do
    on roles(:web) do
      within "#{release_path}" do
        # make sure the packages are installed and up to date, then compile the app. See package.json scripts.
        execute :yarn, "install"
        execute :yarn, "run compile"
      end
    end
  end
end